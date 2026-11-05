#!/usr/bin/env python3
import http.server
import webbrowser
import threading
import os

PORT = 3000
os.chdir(os.path.dirname(os.path.abspath(__file__)))

class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass  # kein Log-Spam

def open_browser():
    webbrowser.open(f'http://localhost:{PORT}')

print(f"Mixing Routing Editor läuft auf http://localhost:{PORT}")
print("Zum Beenden: Strg+C")

threading.Timer(1.0, open_browser).start()
http.server.HTTPServer(('', PORT), Handler).serve_forever()
