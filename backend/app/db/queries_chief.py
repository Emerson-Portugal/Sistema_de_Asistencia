
from app.db.connection import create_connection
from itertools import count

solicitud_counter = count()


def obtener_lista_jefes():
    conn = create_connection()
    jefes = []

    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT dni, nombre_cargo FROM usuario JOIN cargo ON usuario.id_cargo = cargo.id WHERE usuario.id_cargo = 7;")
            jefes = [{"dni": row[0], "nombre_cargo": row[1]} for row in cursor.fetchall()]
        except Exception as e:
            print(f"Error al obtener la lista de jefes: {e}")
        finally:
            cursor.close()
            conn.close()

    return jefes