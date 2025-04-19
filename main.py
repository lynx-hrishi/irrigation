from flask import Flask, jsonify, render_template, request
import pymysql, requests

# conn = pymysql.connect(host='localhost',
#                        user='root',
#                        passwd='root',
#                        charset='utf8',
#                        database='esp8266',
#                        port=3306)

# cursor = conn.cursor()

isConnected = False

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

@app.route('/api/data', methods=['POST'])
def post_data():
    conn = pymysql.connect(host='localhost',
                       user='root',
                       passwd='root',
                       charset='utf8',
                       database='esp8266',
                       port=3306)

    cursor = conn.cursor()

    global isConnected
    data = request.get_json()
    if data:
        temperature = data.get('temperature')
        humidity = data.get('humidity')
        moisture = data.get('moisture')
        rain = data.get('rain')
        water = data.get('water')
        print("the data is being received")
        isConnected = True

        try:
            # cursor.execute("insert into data(temperature, humidity, rain, waterLevel, moisture) values(%s, %s,%s,%s,%s)", (temperature, humidity, rain, water, moisture))
            cursor.execute("update data set temperature = %s, humidity = %s, rain = %s, waterLevel = %s, moisture = %s where id = 1", (temperature, humidity, rain, water, moisture))
            print("Inserted")
        except Exception as e:
            print("Failed to enter data", e)
        finally:
            conn.commit()
            conn.close()
            
        return jsonify({'status' : 'success'}), 200

@app.route('/api/data', methods=['GET'])
def get_data():
    conn = pymysql.connect(host='localhost',
                       user='root',
                       passwd='root',
                       charset='utf8',
                       database='esp8266',
                       port=3306)

    cursor = conn.cursor()

    global isConnected
    if isConnected:
        cursor.execute("select * from data where id = 1")
        rows = cursor.fetchall()
        data = [{'temperature': row[1], 'humidity': row[2], 'rain': row[3], 'waterLevel': row[4], 'moisture': row[5], 'connect':'connected'} for row in rows]
        print(data)
        isConnected = False
        conn.close()
        return jsonify(data), 200
    elif not isConnected:
        print("ESP8266 is Not Connected")
        conn.close()
        return jsonify({"connect": "Not Connected"}), 200
    
# Replace with your ESP8266's IP address
ESP8266_IP = '192.168.209.157'

@app.route('/api/control_pump', methods=['POST'])
def control_led():
    data = request.get_json()
    state = data.get('status')
    if state not in ['on', 'off']:
        return jsonify({'error': 'Invalid state'}), 400

    try:
        # Send the JSON command to the ESP8266
        resp = requests.post(f'http://{ESP8266_IP}/api/pump', json={'state': state})
        print("Raw ESP response:", resp.text)
        return jsonify({'esp_response': resp.json()}), resp.status_code
    except Exception as e:
        # print("Raw ESP response:", resp.text)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)