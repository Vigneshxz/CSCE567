document.addEventListener('DOMContentLoaded', () => {
    // Function to create a league chart
    function createLeagueChart({ csvFile, chartId, infoBoxId, color, yAxisLabel }) {
      d3.csv(csvFile).then(data => {
        // Parse the data
        data.forEach(d => {
          d.Season = d.Season;
          d.W = +d.W; // Wins
          d.D = +d.D; // Draws
          d.L = +d.L; // Losses
          d.GF = +d.GF; // Goals For
          d.GA = +d.GA; // Goals Against
          d.Pts = +d.Pts; // Points
          d.LgRank = d.LgRank; // League Rank
        });
  
        // Set dimensions and margins
        const width = 800, height = 400, margin = { top: 60, right: 30, bottom: 80, left: 70 };
  
        // Create SVG container
        const svg = d3.select(`#${chartId} .chart-container`)
          .append("svg")
          .attr("width", width)
          .attr("height", height);
  
        // Info Box
        const infoBox = d3.select(`#${infoBoxId}`);
  
        // Scales
        const xScale = d3.scalePoint()
          .domain(data.map(d => d.Season))
          .range([margin.left, width - margin.right]);
  
        const yScale = d3.scaleLinear()
          .domain([0, d3.max(data, d => d.W)])
          .nice()
          .range([height - margin.bottom, margin.top]);
  
        // Axes
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);
  
        // Append axes
        svg.append("g")
          .attr("transform", `translate(0,${height - margin.bottom})`)
          .call(xAxis)
          .selectAll("text")
          .attr("transform", "rotate(-45)")
          .style("text-anchor", "end");
  
        svg.append("g")
          .attr("transform", `translate(${margin.left},0)`)
          .call(yAxis);
  
        // Add axis labels
        svg.append("text")
          .attr("class", "axis-label")
          .attr("x", width / 2)
          .attr("y", height - 10)
          .attr("text-anchor", "middle")
          .text("Season");
  
        svg.append("text")
          .attr("class", "axis-label")
          .attr("x", -height / 2)
          .attr("y", 20)
          .attr("text-anchor", "middle")
          .attr("transform", "rotate(-90)")
          .text(yAxisLabel);
  
        // Line
        const line = d3.line()
          .x(d => xScale(d.Season))
          .y(d => yScale(d.W));
  
        svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", color)
          .attr("stroke-width", 2)
          .attr("d", line);
  
        // Points
        svg.selectAll(".dot")
          .data(data)
          .enter()
          .append("circle")
          .attr("class", "dot")
          .attr("cx", d => xScale(d.Season))
          .attr("cy", d => yScale(d.W))
          .attr("r", 5)
          .attr("fill", color)
          .on("mouseover", (event, d) => {
            // Populate info box with data
            infoBox.html(`
              <strong>Season:</strong> ${d.Season}<br>
              <strong>Wins:</strong> ${d.W}<br>
              <strong>Draws:</strong> ${d.D}<br>
              <strong>Losses:</strong> ${d.L}<br>
              <strong>Goals For:</strong> ${d.GF}<br>
              <strong>Goals Against:</strong> ${d.GA}<br>
              <strong>Points:</strong> ${d.Pts}<br>
              <strong>League Rank:</strong> ${d.LgRank}
            `);
          })
          .on("mouseout", () => {
            // Clear the info box when not hovering
            infoBox.html("");
          });
  
        // League Rank Labels
        svg.selectAll(".rank-label")
          .data(data)
          .enter()
          .append("text")
          .attr("class", "rank-label")
          .attr("x", d => xScale(d.Season))
          .attr("y", d => yScale(d.W) - 10) // Position above points
          .attr("text-anchor", "middle")
          .attr("font-size", "12px")
          .attr("fill", "#333")
          .text(d => d.LgRank); // Display league rank
      });
    }
  
    // Create charts for domestic and international leagues
    createLeagueChart({
      csvFile: "domestic.csv",
      chartId: "domestic-league-chart",
      infoBoxId: "info-box",
      color: "#004e92",
      yAxisLabel: "Wins"
    });
  
    createLeagueChart({
      csvFile: "international.csv",
      chartId: "international-competitions-chart",
      infoBoxId: "info-box-international",
      color: "#ff4500",
      yAxisLabel: "Wins"
    });
  
    // All-Time Top Players Interactive Leaderboard
d3.csv("Alltime.csv").then(data => {
    const tableBody = d3.select("#all-time-leaderboard tbody");
    const playerImage = d3.select("#player-image"); // Add a container for the image
  
    // Populate leaderboard
    data.forEach(d => {
      tableBody.append("tr")
        .html(`
          <td>${d.Position}</td>
          <td class="player-name" data-image="${d["Player / Current club"].split(' ')[0].toLowerCase()}.jpg">${d["Player / Current club"]}</td>
          <td>${d.Appearance}</td>
          <td>${d.Goals}</td>
          <td>${d["Goals per match"]}</td>
        `);
    });
  
    // Sorting functionality
    const headers = d3.selectAll("#all-time-leaderboard th");
    headers.on("click", function () {
      const column = d3.select(this).text().toLowerCase().replace(/ /g, "_");
      const isNumeric = column !== "player";
  
      // Sort rows
      const rows = tableBody.selectAll("tr").sort((a, b) => {
        if (isNumeric) return d3.descending(+a[column], +b[column]);
        return d3.ascending(a[column], b[column]);
      });
  
      // Re-append rows
      rows.each(function () {
        tableBody.node().appendChild(this);
      });
    });
  
    // Add click event to display player images
    tableBody.selectAll(".player-name").on("click", function () {
      const imageFile = d3.select(this).attr("data-image");
      playerImage.html(`<img src="images/${imageFile}" alt="Player Image" class="player-photo">`);
    });
  });
  

  













  // 2023-2024 Top Players Pie Chart
d3.csv("new.csv").then(data => {
    // Parse the data
    data.forEach(d => {
      d.FirstName = d.Name.split(" ")[0]; // Extract the first name
      d.Goals = +d.Goals;
      d["Games played"] = +d["Games played"];
    });
  
    // Set dimensions and margins
    const width = 400, height = 400, radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory10);
  
    // Create SVG container
    const svg = d3.select("#current-leaderboard")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);
  
    // Create pie chart layout
    const pie = d3.pie().value(d => d.Goals);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);
  
    // Info Box for interactivity
    const infoBox = d3.select("#current-leaderboard")
      .append("div")
      .attr("class", "info-box")
      .style("opacity", 0);
  
    // Draw pie chart
    svg.selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => color(i))
      .style("cursor", "pointer")
      .on("mouseover", (event, d) => {
        d3.select(event.currentTarget).style("opacity", 0.8);
        infoBox
          .html(`
            <strong>Player:</strong> ${d.data.Name}<br>
            <strong>Goals:</strong> ${d.data.Goals}<br>
            <strong>Games Played:</strong> ${d.data["Games played"]}
          `)
          .style("opacity", 1);
      })
      .on("mousemove", event => {
        infoBox
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY + 10}px`);
      })
      .on("mouseout", event => {
        d3.select(event.currentTarget).style("opacity", 1);
        infoBox.style("opacity", 0);
      });
  
    // Add first names inside the slices
    svg.selectAll("text")
      .data(pie(data))
      .enter()
      .append("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .style("fill", "#fff")
      .text(d => d.data.FirstName);
  });
  




});
  












  
  
  