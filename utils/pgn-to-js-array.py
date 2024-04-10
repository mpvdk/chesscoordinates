# Import the regular expression library
import re
import sys

def parse_pgn_to_js_array(pgn_filepath, js_filepath):
    with open(pgn_filepath, 'r') as file:
        content = file.read()

    # Split games based on empty lines or the start of a new game metadata
    games = re.split(r'\n\n(?=\[)', content)

    # Initialize the JS array string
    js_array = 'const games = [\n'

    for game in games:
        # Remove meta information and new lines, then split into moves
        moves_str = re.sub(r'\[.*?\]\s*\n', '', game).replace('\n', ' ').strip()
        # Remove result at the end of the game (e.g., 1-0, 1/2-1/2, 0-1)
        moves_str = re.sub(r'\s*(1-0|0-1|1/2-1/2)\s*$', '', moves_str)
        # Split moves and pair them
        moves = moves_str.split(' ')
        paired_moves = [f'{moves[i]} {moves[i+1]}' for i in range(0, len(moves) - 1, 2)]
        # Add to JS array
        js_array += f"['{'\', \''.join(paired_moves)}'],\n"

    # Close the array
    js_array += '];'

    # Write the JS array to a file
    with open(js_filepath, 'w') as file:
        file.write(js_array)

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python script.py <path_to_pgn_file>")
        sys.exit(1)

    pgn_filepath = sys.argv[1]  # Take the first argument as the PGN file path
    js_filepath = pgn_filepath.replace('.pgn', '.js')  # Output file name
    print(js_filepath)

    parse_pgn_to_js_array(pgn_filepath, js_filepath)
