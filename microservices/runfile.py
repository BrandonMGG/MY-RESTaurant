import subprocess

def run_app(path, port):
    subprocess.Popen(["python", path, str(port)])

if __name__ == "__main__":
    apps = [("addHours.py", 5001), 
            ("addRes.py", 5002), 
            ("analyze.py", 5003), 
            ("apiGateway.py", 5004), 
            ("delRes.py", 5005), 
            ("getAllRes.py", 5006), 
            ("getHours.py", 5007), 
            ("getLocal.py", 5008), 
            ("getMesas.py", 5009), 
            ("getPlato.py", 5010), 
            ("getRecommendation.py", 5011), 
            ("getResCliente.py", 5012), 
            ("sugHora.py", 5013), 
            ("updateRes.py", 5014)]
    
    for app, port in apps:
        run_app(app, port)
