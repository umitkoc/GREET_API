const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Dinamik olarak statik dosyalar ve şablonları yüklemek için middleware
app.use((req, res, next) => {
    const basePath = req.path.split('/')[1]; // İlk URL segmentini al (web_design_1, web_design_2, ...)

    // Statik klasör yolu
    const staticPath = path.join(__dirname, "templates", basePath, "");
    const templatePath = path.join(__dirname, "templates", basePath);

    // Statik klasör var mı?
    if (fs.existsSync(staticPath)) {
        app.use(express.static(staticPath)); // Dinamik statik klasör
    }

    // Şablon klasörünü kaydet
    req.templatePath = templatePath;
    next();
});

// Dinamik olarak şablon dosyalarını gönder
app.get("/:design/:page?", (req, res) => {
 
    const { design, page } = req.params;
    const templatePath = path.join(__dirname, "templates", design);
    
    // Şablon dosyasını belirle (örneğin: index.html veya başka bir dosya)
    const templateFile = page ? `${page}` : "index.html";
    const filePath = path.join(templatePath, templateFile);

    // Şablon var mı?
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send("Page not found!");
    }
});

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
