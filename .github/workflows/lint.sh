#! /bin/bash

code=0
for file in $(npx prettier -l .); do
  DIFF=$(diff "$file" <(npx prettier "$file"))
  IFS=$'\n'
  for line in $DIFF; do
    code=1
    echo "$line"
    if [[ "$line" =~ ^[0-9] ]]; then
      lines=$(echo $line | tr 'da' 'cc' | cut -dc -f1 | tr ',' $'\n')
      idx=0
      min=""
      max=""
      for n in $lines; do
        if [ "$idx" -eq 0 ]; then
          min=$n
          max=$n
        elif [ "$idx" -eq 1 ]; then
          max=$n
        fi
        ((idx += 1))
      done
      echo "min=$min max=$max"
      message=""
      if [ "$min" -eq "$max" ]; then
        message="Error on line $min"
      else
        message="Error from line $min to line $max"
      fi
      printf $'::error file=%s,line=%s,endLine=%s,title=prettier::%s\n' "$file" "$min" "$max" "$message"
    fi
  done
done

exit $code
