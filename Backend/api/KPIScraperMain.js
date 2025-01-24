const puppeteer = require('puppeteer');
const fs = require('fs');
const ExcelJS = require('exceljs');

(async () => {
    // Launch Puppeteer
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Open the webpage
    const url = "https://www.indiapost.gov.in/VAS/Pages/PMODashboard/AmtofCBSTxn.aspx";
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Wait for the tab with the ID 'tab1'
    await page.waitForSelector('#tab1');

    // Select the tab element
    const tab = await page.$('#tab1');

    // Extract the table data
    const tableData = await page.evaluate(() => {
        const data = [];
        const table = document.querySelector('#tbl_data');

        if (table) {
            // Extract headers
            const headers = Array.from(table.querySelectorAll('th')).map(header => header.textContent.trim());
            data.push(headers);

            // Extract rows
            const rows = table.querySelectorAll('tr');
            rows.forEach((row, index) => {
                if (index > 0) { // Skip the header row
                    const cols = Array.from(row.querySelectorAll('td')).map(col => col.textContent.trim());
                    if (cols.length > 0) data.push(cols);
                }
            });
        }
        return data;
    });

    // Close the browser
    await browser.close();

    // Write data to an Excel file using ExcelJS
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Scraped Data');

    // Add rows to the worksheet
    tableData.forEach(row => worksheet.addRow(row));

    // Save to file
    await workbook.xlsx.writeFile('scraped_table.xlsx');

    console.log("Data scraped and saved to 'scraped_table.xlsx'");
})();