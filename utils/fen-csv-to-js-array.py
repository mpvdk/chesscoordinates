import csv
import sys
import json

def extract_fen_to_js_array(csv_file_path, js_file_path='fen-array.js'):
    # Extract FEN values from the CSV
    fen_values = []
    counter = 0
    with open(csv_file_path, mode='r', encoding='utf-8') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            if counter >= 500:
                break
            if 'FEN' in row:
                counter = counter + 1
                fen_values.append(row['FEN'])
    
    # Convert the Python list to a JavaScript array string
    js_array_str = 'const fenArray = ' + json.dumps(fen_values) + ';'
    
    # Write the JavaScript array to a file
    with open(js_file_path, mode='w', encoding='utf-8') as js_file:
        js_file.write(js_array_str)
    
    print(f"JavaScript array of FEN values has been written to {js_file_path}")

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python script.py <path_to_csv_file>")
    else:
        csv_file_path = sys.argv[1]
        extract_fen_to_js_array(csv_file_path)

