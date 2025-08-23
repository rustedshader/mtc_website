#!/bin/bash

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick is not installed. Please install it first."
    exit 1
fi

# Check if directory and quality are provided as arguments
if [ $# -ne 2 ]; then
    echo "Usage: $0 <input_directory> <quality>"
    echo "Example: $0 ./images 75"
    echo "Quality should be between 1 and 100"
    exit 1
fi

INPUT_DIR="$1"
QUALITY="$2"

# Validate input directory
if [ ! -d "$INPUT_DIR" ]; then
    echo "Error: Directory '$INPUT_DIR' does not exist."
    exit 1
fi

# Validate quality is a number between 1 and 100
if ! [[ "$QUALITY" =~ ^[0-9]+$ ]] || [ "$QUALITY" -lt 1 ] || [ "$QUALITY" -gt 100 ]; then
    echo "Error: Quality must be a number between 1 and 100."
    exit 1
fi

# Create output directory if it doesn't exist
OUTPUT_DIR="${INPUT_DIR}/compressed"
mkdir -p "$OUTPUT_DIR"

# Process images
for img in "$INPUT_DIR"/*.{jpg,jpeg,png}; do
    # Check if files exist
    if [[ -f "$img" ]]; then
        filename=$(basename "$img")
        echo "Processing $filename..."
        # Compress image without resizing, apply quality, and strip metadata
        convert "$img" -quality "$QUALITY" -strip "$OUTPUT_DIR/$filename"
        if [ $? -eq 0 ]; then
            echo "Successfully compressed $filename"
        else
            echo "Failed to compress $filename"
        fi
    fi
done

echo "Image compression complete. Compressed images saved in $OUTPUT_DIR"
