import qrcode
import json
import os

def create_qr(data, filename):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(json.dumps(data))
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    
    # Ensure public folder exists
    public_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public')
    os.makedirs(public_dir, exist_ok=True)
    
    file_path = os.path.join(public_dir, filename)
    img.save(file_path)
    print(f"Generated QR Code at: {file_path}")

def main():
    # Transaction 1: Normal everyday transaction
    tx_normal = {
        "target_account": "amazon_retail@upi",
        "amount": 1250,
        "category": "Retail",
        "location": "New York, USA"
    }
    
    # Transaction 2: Suspicious anomalous transaction
    tx_anomalous = {
        "target_account": "unknown_crypto_exchange@upi",
        "amount": 15500,
        "category": "Transfer",
        "location": "London, UK"
    }
    
    create_qr(tx_normal, 'sample_qr_normal.png')
    create_qr(tx_anomalous, 'sample_qr_anomalous.png')
    print("Done generating sample QR codes.")

if __name__ == "__main__":
    main()
