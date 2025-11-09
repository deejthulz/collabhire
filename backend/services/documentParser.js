class DocumentParser {
  async parseDocument(filePath) {
    const path = require('path');
    const fs = require('fs').promises;
    const ext = path.extname(filePath).toLowerCase();
    
    try {
      if (ext === '.pdf') {
        // Lazy load pdf-parse only when needed
        const pdf = require('pdf-parse');
        const dataBuffer = await fs.readFile(filePath);
        const data = await pdf(dataBuffer);
        return data.text;
      } else if (ext === '.doc' || ext === '.docx') {
        // Lazy load mammoth only when needed
        const mammoth = require('mammoth');
        const result = await mammoth.extractRawText({ path: filePath });
        return result.value;
      } else {
        throw new Error('Unsupported file type');
      }
    } catch (error) {
      console.error('Document parsing error:', error);
      throw new Error('Failed to parse document: ' + error.message);
    } finally {
      await fs.unlink(filePath).catch(err => console.error('Error deleting file:', err));
    }
  }
}

module.exports = new DocumentParser();
