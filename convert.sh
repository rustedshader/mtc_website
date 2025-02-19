#! /bin/bash

for i in ./public/events/* ; do 
filename=$(echo $i | sed 's/\.[^.]*$//')
magick $i  -strip -interlace Plane -gaussian-blur 0.05 -quality 85% "${filename}_converted.jpg"
done
