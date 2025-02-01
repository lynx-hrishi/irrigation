from flask import Flask, jsonify, render_template
import serial

app = Flask(__name__)

# pages
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about-us')
def about_us():
    return render_template('about_us.html')

@app.route("/components")
def components():
    return render_template('components.html')

@app.route('/readings')
def readings():
    return render_template('readings.html')

# Initialize the serial port
try:
    esp8266 = serial.Serial(port='COM4', baudrate=115200, timeout=1)
    print("Esp8266 connected")
except serial.SerialException as e:
    esp8266 = None
    print(f"Error connecting to Esp8266: {e}")

@app.route('/read-esp8266') 
def read_esp8266():
    if esp8266:
        try:
            data_to_send = esp8266.readline().decode('utf-8').strip()
            print(data_to_send)
            return jsonify({"data" : data_to_send})
            # return "This is the data"
            # return jsonify({data_to_send})
    
        except Exception as e:
            return jsonify({"error": str(e)})
    else:
        return jsonify({"error": "Esp8266 not connected"})

if __name__ == '__main__':
    app.run(debug=False)  # Disable debug mode to avoid serial port issues
