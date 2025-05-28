export default function Contact() {
    return (
        <div className="container">
            <h2>Contact Us</h2>
            <div style={{display: 'flex', gap: '1rem'}}>
                <div className="card" style={{flex: 1}}>
                    <h3>Sales</h3>
                    <p>Email: sales@example.com</p>
                    <p>Phone: +92 336 5656445</p>
                </div>
                <div className="card" style={{flex: 1}}>
                    <h3>Support</h3>
                    <p>Email: junaid@yahoo.com</p>
                    <p>Phone: +92 332 5655655</p>
                </div>
            </div>
        </div>
    );
}