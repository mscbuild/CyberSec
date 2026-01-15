rule LOTL_PowerShell_InMemory_Attack
{
    meta:
        author = "SOC Detection Engineering"
        description = "Detects Living off the Land PowerShell-based malware in memory"
        category = "LOTL / Fileless Attack"
        technique = "MITRE ATT&CK T1059.001, T1027, T1086"
        confidence = "high"
        date = "2026-01-14"

    strings:
        /* Obfuscation & Execution */
        $ps1 = "Invoke-Expression" nocase
        $ps2 = "IEX" nocase
        $ps3 = "FromBase64String" nocase
        $ps4 = "-EncodedCommand" nocase
        $ps5 = "System.Convert" nocase

        /* LOLBins / Living off the Land */
        $lol1 = "powershell.exe" nocase
        $lol2 = "pwsh.exe" nocase
        $lol3 = "cmd.exe /c" nocase
        $lol4 = "rundll32.exe" nocase
        $lol5 = "mshta.exe" nocase
        $lol6 = "wmic process call create" nocase

        /* Network / Payload Staging */
        $net1 = "DownloadString" nocase
        $net2 = "WebClient" nocase
        $net3 = "Invoke-WebRequest" nocase
        $net4 = "http://" nocase
        $net5 = "https://" nocase

        /* Memory-only indicators */
        $mem1 = "Reflection.Assembly" nocase
        $mem2 = "Load(" nocase
        $mem3 = "GetDelegateForFunctionPointer" nocase

    condition:
        uint16(0) == 0x5A4D or filesize < 10MB and
        (
            (2 of ($ps*)) and
            (1 of ($lol*)) and
            (1 of ($net*)) and
            (1 of ($mem*))
        )
}
