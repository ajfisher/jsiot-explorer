# Light sensor

In this example we'll use a light sensor and push the data into a chart on a
web page for visualisation. This will only be local but should give you a good
view of what type of data you can quickly create. In this case, no data will be
stored, it's purely visual only.

## Components needed

| # | Component         |
|---|-------------------|
| 1 | Arduino           |
| 1 | Light sensor      |
| 4 | Jumper wires      |
| 2 | 10KΩ Resistors    |

## Build the circuit

TODO

## Run the code

You can run the code with:

```
node 3_sensors/light/light.js
```

Once you run the code you should be able to open up [http://localhost:8000](http://localhost:8000)
and watch your light sensor provide data. It operates in the range 0-1023 so
see how different levels of light affect that.


