from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/evaluate', methods=['POST'])
def evaluate():
    data = request.json
    N = data['N']
    P = data['P']
    K = data['K']
    temperature = data['temperature']
    humidity = data['humidity']
    pH = data['pH']
    rainfall = data['rainfall']
    plant = data['plant'].lower()  # Convert plant name to lowercase

    # Construct the command
    command = [
        'python', 'predict.py',
        '--N', str(N),
        '--P', str(P),
        '--K', str(K),
        '--temperature', str(temperature),
        '--humidity', str(humidity),
        '--pH', str(pH),
        '--rainfall', str(rainfall),
        'evaluate',
        '--plant', plant
    ]

    # Run the command
    result = subprocess.run(command, capture_output=True, text=True)
    output = result.stdout.strip()

    # Extract the success rate from the output
    try:
        success_rate = float(output.split(':')[-1].strip().replace('%', ''))
    except ValueError:
        success_rate = 0

    return jsonify({'success_rate': success_rate})

if __name__ == '__main__':
    app.run(debug=True)

