import psycopg2

def create_connection():
    # Parámetros de conexión (puedes cargarlos desde .env o proporcionarlos directamente)
    dbname = 'test_asistencia'
    user = 'postgres'
    password = '7895'
    #password = 'admin7895'
    host = 'localhost'
    port = '5432'
    #port = '8086'

    try:
        conn = psycopg2.connect(
            dbname=dbname,
            user=user,
            password=password,
            host=host,
            port=port
        )
        print("Conexión exitosa")
        return conn

    except psycopg2.Error as e:
        print("Error al conectar a PostgreSQL:", e)
        return None
