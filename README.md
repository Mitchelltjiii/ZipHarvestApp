🌽 ZipHarvest – Voice-Activated Crop Data Compliance App
ZipHarvest is a full-stack React web application developed to streamline compliance reporting for agricultural producers. By enabling voice-controlled data entry, ZipHarvest eliminates the need for manual logging.

🚀 Key Features
🎙️ Hands-Free Voice Input – Uses speech recognition to allow farmers to record crop weights without interrupting their workflow.

🔍 Smart Serial Matching – Matches crops using the last 3 digits of a tag’s serial number, filtered by crop type to ensure accurate associations.

📄 Compliance-Ready Format – Captures and organizes data according to regulatory reporting requirements.

🖥️ No Special Hardware Needed – Unlike many commercial solutions, ZipHarvest runs on any modern device without the need for a Bluetooth-enabled scale.

💵 Cost-Effective & Scalable – Avoids expensive hardware investments, making it accessible to small and large farming operations alike.

🛠️ Tech Stack
Frontend: React, React Speech Recognition

Backend: Node.js, Express

Database: MySQL

Other Tools: Stripe (for subscriptions), SendGrid (for notifications)

🧑‍🌾 Real-World Use Case
A farmer reads aloud the last three digits of a serial tag followed by the crop’s weight:
“567 is 2.4 pounds”
ZipHarvest parses the speech, matches the serial number to the correct crop using context filters, and logs the weight—ready for compliance submission.

📦 Deployment & Access
🚫 Note: ZipHarvest was previously live at www.ZipHarvest.app but is no longer active.
The platform supported subscriptions with no installation required—just a web browser.

🧩 Installation
While the app is no longer hosted, the code can be adapted for self-hosted use or redeployment. Reach out if you’re interested in exploring licensing or collaboration. However, much of the code relies on deprecated assets.

📝 Usage Notes
Works well even in loud environments.

Currently designed for English-language input and imperial units (grams, pounds).

👥 Contributing
No contribution guidelines.

⚖️ License
Apache License 2.0

🙌 Credits
Developer: Mitchell Johnson

Voice Recognition: React Speech Recognition
