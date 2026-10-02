import json
import time
import urllib.request
import urllib.error

base_url = "http://127.0.0.1:8000/api"

print("Logging in...")
login_data = json.dumps({"email": "indicio.admin@gmail.com", "password": "admin123"}).encode("utf-8")
req = urllib.request.Request(f"{base_url}/auth/login", data=login_data, headers={"Content-Type": "application/json"})
try:
    with urllib.request.urlopen(req) as resp:
        token = json.loads(resp.read())["access_token"]
except urllib.error.HTTPError as e:
    print("Login failed:", e.read().decode())
    exit(1)

headers = {"Authorization": f"Bearer {token}"}

print("Uploading file...")
boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW"
body = (
    f"--{boundary}\r\n"
    f"Content-Disposition: form-data; name=\"file\"; filename=\"test_ai.txt\"\r\n"
    f"Content-Type: text/plain\r\n\r\n"
    f"Factura 001\nCliente: Juan Perez\nTotal: $500\nFecha: 2026-09-11\nPor favor pagar a tiempo.\r\n"
    f"--{boundary}--\r\n"
)

req = urllib.request.Request(f"{base_url}/documents/upload", data=body.encode("utf-8"), headers={
    "Authorization": f"Bearer {token}",
    "Content-Type": f"multipart/form-data; boundary={boundary}"
})
try:
    with urllib.request.urlopen(req) as resp:
        doc_id = json.loads(resp.read())["id"]
except urllib.error.HTTPError as e:
    print("Upload failed:", e.read().decode())
    exit(1)

print(f"Uploaded successfully! Document ID: {doc_id}")

print("Waiting for AI processing...")
for _ in range(15):
    time.sleep(2)
    req = urllib.request.Request(f"{base_url}/documents/{doc_id}", headers=headers)
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read())
    status = data["status"]
    print(f"Status: {status}")
    if status in ["Procesado", "Error"]:
        print("Final details:")
        print(json.dumps(data, indent=2, ensure_ascii=False))
        break
else:
    print("Timeout waiting for processing.")
