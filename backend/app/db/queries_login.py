# queries.py
from app.db.connection import create_connection
from itertools import count
solicitud_counter = count()

solicitudes_pendientes = []

def consultar_login(dni, password):
    conn = create_connection()
    
    if conn:
        try:
            cursor = conn.cursor()

            # Consulta para verificar las credenciales
            cursor.execute("SELECT * FROM usuario WHERE dni=%s AND password_hash=%s;", (dni, password))

            result = cursor.fetchone()

            if result:
                # Si las credenciales son correctas, puedes devolver la información del usuario
                column_names = [desc[0] for desc in cursor.description]
                usuario = dict(zip(column_names, result))
                return usuario
            else:
                print("Credenciales incorrectas. Por favor, verifique su DNI y contraseña.")
                return None

        except Exception as e:
            print(f"Error al realizar la consulta: {e}")

        finally:
            cursor.close()
            conn.close()

    return None



