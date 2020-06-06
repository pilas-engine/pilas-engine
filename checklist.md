Esta es una lista de funcionalidades que se deben probar cada vez que
intenta lanzar una versión nueva de pilas-engine:

1 - Los tests de la aplicación tienen que dar OK: 
        http://localhost:4200/tests?hidepassed
2 - Se tiene que abrir el primer ejemplo y desde ahí ir abriendo uno 
    a uno todos los ejemplos para asegurarse que funcionan.
3 - El guardado de proyectos tiene que funcionar, incluso cerrando y 
    volviendo a abrir la aplicación.
4 - Se tiene que compilar la aplicación, al menos solo en osx, y
    ejecutarla para ver que funciona bien. Se puede poner en 0 las
    variables del archivo Makefile para deshabilitar compilaciones
    a otroas plataformas.
4 - Se tiene que probar que el modo servidor y accediendo desde 
    el celular funcione.
