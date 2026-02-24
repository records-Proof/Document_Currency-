function qs(id){ return document.getElementById(id); }

function pretty(obj){
  return JSON.stringify(obj, null, 2);
}

// Static-mode verification (works on GitHub Pages):
// - parses JSON
// - checks required fields
// - prints tier + permissions
function verifyLicenseStatic(){
  const out = qs("verify_out");
  out.textContent = "—";

  let obj;
  try{
    obj = JSON.parse(qs("license_json").value || "{}");
  }catch(e){
    out.textContent = "Invalid JSON.";
    return;
  }

  const required = ["license_id","issued_to","tier","permissions","valid_from","valid_to"];
  const missing = required.filter(k => obj[k] === undefined || obj[k] === null);
  if(missing.length){
    out.textContent = "Missing fields: " + missing.join(", ");
    return;
  }

  // Basic validation only
  const summary = {
    valid: true,
    mode: "static",
    license_id: obj.license_id,
    tier: obj.tier,
    issued_to: obj.issued_to,
    permissions: obj.permissions,
    valid_from: obj.valid_from,
    valid_to: obj.valid_to,
    note: "Static-mode check (no signature verification). Deploy verify.example.js to enable cryptographic verification."
  };

  out.textContent = pretty(summary);
}

async function loadSample(){
  const res = await fetch("api/license/sample-license.json", { cache: "no-store" });
  const j = await res.json();
  qs("license_json").value = pretty(j);
  qs("verify_out").textContent = "Loaded sample license JSON.";
}

async function openTiers(){
  window.open("api/license/tiers.json", "_blank", "noopener,noreferrer");
}      });
    };

    docSearch.addEventListener("input", filter);

    window.addEventListener("keydown", (e) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const mod = isMac ? e.metaKey : e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        docSearch.focus();
      }
    });
  }

  // Contact email generator
  const contactForm = document.getElementById("contactForm");
  const emailOutput = document.getElementById("emailOutput");
  const copyBtn = document.getElementById("copyEmailBtn");

  if (contactForm && emailOutput) {
    let lastEmail = "";

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const recipient = (document.getElementById("recipient")?.value || "").trim();
      const fromEmail = (document.getElementById("fromEmail")?.value || "").trim();
      const focus = (document.getElementById("focus")?.value || "sandbox").trim();
      const notes = (document.getElementById("notes")?.value || "").trim();

      const subjectMap = {
        sandbox: "TransitCloud — Sandbox / Innovation Review Request",
        pilot: "TransitCloud — Pilot Request (Verifiable Financial Documents)",
        enterprise: "TransitCloud — Enterprise Verification & Audit Infrastructure",
      };

      const subject = subjectMap[focus] || subjectMap.sandbox;

      const header = [
        recipient ? `To: ${recipient}` : "To: [Recipient / Division]",
        fromEmail ? `From: ${fromEmail}` : "From: Kam Swygert",
        `Subject: ${subject}`,
        "",
      ].join("\n");

      const body = [
        "Hello,",
        "",
        "My name is Kam Swygert. I built TransitCloud, a cryptographically verifiable document system that converts invoices, receipts, and audit records into tamper-evident instruments.",
        "",
        "TransitCloud provides:",
        "• deterministic canonicalization (stable bytes)",
        "• SHA-256 root hashes for integrity",
        "• Ed25519 signatures for authenticity",
        "• portable proof bundles for offline verification",
        "• optional onchain anchoring of roots for timestamped attestation",
        "",
        focus === "sandbox"
          ? "I’m requesting a regulatory sandbox / innovation review to pilot TransitCloud with a limited set of South Carolina participants under strict controls (limited doc types, full logging, clear disclosures, no speculative trading)."
          : focus === "pilot"
          ? "I’m requesting a pilot with your organization to demonstrate fraud-resistant document verification and audit trail integrity using real invoices/receipts under controlled conditions."
          : "I’m reaching out to discuss enterprise deployment for document verification, audit, and custody rails, with optional public attestation via onchain root anchoring.",
        "",
        notes ? `Notes:\n${notes}\n` : "",
        "I can provide a one-page overview, technical documentation, and a working demo on request.",
        "",
        "Sincerely,",
        "Kam Swygert",
        "TransitCloud Document Currency Infrastructure",
      ].join("\n");

      lastEmail = `${header}${body}`;
      emailOutput.textContent = lastEmail;
      if (copyBtn) copyBtn.disabled = false;
    });

    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(lastEmail);
          copyBtn.textContent = "Copied";
          setTimeout(() => (copyBtn.textContent = "Copy"), 1200);
        } catch {
          // fallback: select output text
          const range = document.createRange();
          range.selectNodeContents(emailOutput);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        }
      });
    }
  }
})();
