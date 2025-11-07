// In-memory receipt storage
const receipts = [];

class ReceiptModel {
    static create(receiptData) {
        const receipt = {
            receiptId: `r_${new Date().getTime()}_${Math.random().toString(36).substr(2, 9)}`,
            ...receiptData,
            status: 'processing', // Default status
            createdAt: new Date(),
            timestamp: new Date().toISOString(),
        };
        receipts.push(receipt);
        return receipt;
    }

    static getById(receiptId) {
        return receipts.find((r) => r.receiptId === receiptId);
    }

    static getAll() {
        return receipts;
    }

    static getByEmail(email) {
        return receipts.filter((r) => r.email === email);
    }

    // Add method to update order status
    static updateStatus(receiptId, status) {
        const receipt = receipts.find((r) => r.receiptId === receiptId);
        if (receipt) {
            receipt.status = status;
            receipt.updatedAt = new Date();
        }
        return receipt;
    }
}

module.exports = ReceiptModel;