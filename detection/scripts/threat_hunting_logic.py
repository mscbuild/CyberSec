import requests
import json

# A script for detecting anomalous PowerShell activity (LotL attacks)
# Integration with a hypothetical SIEM API (e.g. Splunk or Elastic)

def hunt_lotl_activity(api_url, headers):
    # The query looks for PowerShell execution with the bypass policy and hide window flags.
    query = {
        "search": "index=logs process_name=powershell.exe (args='-EncodedCommand' OR args='-ExecutionPolicy Bypass' OR args='-WindowStyle Hidden')",
        "earliest_time": "-24h"
    }
    
    try:
        response = requests.post(f"{api_url}/services/search/jobs", headers=headers, data=query)
        if response.status_code == 201:
            print("[+] Search launched. Analysis of hidden movement vectors....")
            # Logic for processing results and identifying suspicious IPs
        else:
            print("[-] SIEM connection error")
    except Exception as e:
        print(f"[-] Critical error: {e}")

if __name__ == "__main__":
    API_ENDPOINT = "https://siem-prod.local:8089"
    AUTH_HEADERS = {"Authorization": "Bearer <TOKEN_REDACTED>"}
    hunt_lotl_activity(API_ENDPOINT, AUTH_HEADERS)
