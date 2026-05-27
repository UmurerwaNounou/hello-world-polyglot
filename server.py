#!/usr/bin/env python3
"""
server.py — Simple HTTP server for the Polyglot Hello World app.
Run:  python3 server.py
Then open: http://localhost:8080
"""

import http.server
import socketserver
import webbrowser
import os

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        print(f"  → {self.address_string()} [{format % args}]")


def main():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}"
        print(f"\n  🌐  Polyglot server running at {url}")
        print("  Press Ctrl+C to stop.\n")
        webbrowser.open(url)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n  Server stopped.")


if __name__ == "__main__":
    main()
