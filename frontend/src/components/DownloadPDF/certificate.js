const certificate = (name, role, start, end, certID) => {
    return `
        <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Internship Certificate</title>
    <style>
    @page {
    size: A4; 
    margin: 0; 
}
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f9;
}

.certificate-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.certificate-border {
    padding: 30px;
    background: linear-gradient(45deg, rgba(26, 115, 232, 0.3), rgba(26, 115, 232, 0.1), rgba(26, 115, 232, 0.3));
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.certificate-content {
    width: 297mm;      
    height: 140mm;     
    max-width: 850px; 
    background-color: #fff;
    padding: 40px;
    text-align: center;
    border-radius: 12px;
}

.certificate-title {
    font-size: 36px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
    text-transform: uppercase;
}

.certificate-text {
    font-size: 18px;
    color: #555;
    margin-bottom: 10px;
}

.user-name, .role, .company-name {
    font-size: 26px;
    color: #1a73e8;
    margin: 15px 0;
}

.certificate-id {
    font-size: 16px;
    color: #999;
    margin-top: 20px;
}

.signature-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 80px;
}

.signature-box {
    width: 200px;
    border-top: 2px solid #333;
    padding-top: 5px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: #333;
}
</style>
</head>
<body>
    <div class="certificate-container">
        <div class="certificate-border">
            <div class="certificate-content">
                <h1 class="certificate-title">Certificate of Internship</h1>
                <p class="certificate-text">This is to certify that</p>
                <h2 class="user-name">${name}</h2>
                <p class="certificate-text">has successfully completed internship for the domain</p>
                <h2 class="role">${role}</h2>
                <p class="certificate-text">at</p>
                <h2 class="company-name">ABC Inc.</h2>
                <p class="certificate-text">from <strong>${start}</strong> to <strong>${end}</strong>.</p>
                <p class="certificate-id">Certificate ID: <strong>${certID}</strong></p>
                <div class="signature-container">
                    <div class="signature-box">
                        <p>Authorized Signature</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
};

module.exports = certificate;
