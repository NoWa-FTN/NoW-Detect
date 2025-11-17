from flask import Flask, render_template, jsonify, request, make_response
import json

app = Flask(__name__)

cache_events = []
cache_flows = []

def load_suricata_logs():
    global cache_events, cache_flows
    events = []
    flows = []
    with open('/var/log/suricata/eve.json', 'r') as f:
        for line_num, line in enumerate(f, 1):
            try:
                obj = json.loads(line)
            except json.JSONDecodeError as e:
                print(f"Erreur JSON à la ligne {line_num}: {e}. Ligne ignorée.")
                continue 
            if 'alert' in obj:
                events.append(obj)
            if obj.get('flow') and obj['flow'].get('proto') == 'TCP':
                flows.append(obj)
            elif obj.get('http'):
                flows.append(obj)
    cache_events = events[::-1]
    cache_flows = flows[::-1]

@app.route('/api/events')
def events():
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 10))
    start = (page - 1) * per_page
    end = start + per_page
    total = len(cache_events)
    resp = make_response(jsonify(cache_events[start:end]))
    total_pages = (total + per_page - 1) // per_page
    resp.headers['X-Total-Pages'] = total_pages
    return resp

@app.route('/api/flows')
def flows():
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 10))
    start = (page - 1) * per_page
    end = start + per_page
    total = len(cache_flows)
    resp = make_response(jsonify(cache_flows[start:end]))
    total_pages = (total + per_page - 1) // per_page
    resp.headers['X-Total-Pages'] = total_pages
    return resp

@app.route('/')
def home():
    return render_template('home.html')

if __name__ == '__main__':
    load_suricata_logs()
    app.run(debug=True, host='10.10.10.60', port=5000)
