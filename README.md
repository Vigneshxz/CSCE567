## How to Run the Project Locally  

This project requires Python to run a local HTTP server. Follow the instructions below to set it up:  

### **1. Check Python Installation**  
- Open your terminal and run:  
  - For Python 3:  
    ```bash
    python3 --version
    ```  
  - For Python 2:  
    ```bash
    python --version
    ```  

- If Python is not installed, download it from [python.org](https://www.python.org/).  
  - During installation on Windows, check the box **"Add Python to PATH"**.

---

### **2. Start a Local HTTP Server**  
- Navigate to the folder containing the project files in your terminal.  

- Run one of the following commands based on your Python version:  
  - **For Python 3**:  
    ```bash
    python3 -m http.server
    ```  
  - **For Python 2**:  
    ```bash
    python -m SimpleHTTPServer
    ```  [
---

### **3. Open in Your Browser**  
- After running the server, you’ll see an output like this:  
  ```text
  eg: Serving HTTP on 0.0.0.0 port 8000 ...

 Open your browser and go to the URL: eg: (http://localhost:8000)

 ---
