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




def insertar_formulario(dni_usuario, descripcion, fecha_retorno, autorizacion_jefe, autorizacion):
    try:
        with create_connection() as conn, conn.cursor() as cursor:
            # Insertar datos en la tabla formulario
            cursor.execute("""
                INSERT INTO formulario (dni_usuario, descripcion, fecha_retorno, autorizacion_jefe, autorizacion)
                VALUES (%s, %s, %s, %s, %s)
            """, (dni_usuario, descripcion, fecha_retorno, autorizacion_jefe, autorizacion))

            # Commit para aplicar los cambios en la base de datos
            conn.commit()

        print("Datos del formulario insertados correctamente.")
    except Exception as e:
        print(f"Error al insertar datos en la tabla formulario: {e}")




def obtener_lista_jefes():
    jefes = []

    try:
        with create_connection() as conn, conn.cursor() as cursor:
            cursor.execute("SELECT dni, nombre_cargo FROM usuario JOIN cargo ON usuario.id_cargo = cargo.id WHERE usuario.id_cargo = 7;")
            jefes = [{"dni": row[0], "nombre_cargo": row[1]} for row in cursor.fetchall()]
    except Exception as e:
        print(f"Error al obtener la lista de jefes: {e}")

    return jefes



def obtener_formularios():
    conn = create_connection()
    
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM formulario;")
            formularios = cursor.fetchall()
            return formularios
        except Exception as e:
            print(f"Error al obtener la lista de formularios: {e}")
        finally:
            cursor.close()
            conn.close()

    return []

def obtener_formulario_por_id(id_formulario):
    conn = create_connection()
    
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM formulario WHERE id = %s;", (id_formulario,))
            formulario = cursor.fetchone()
            return formulario
        except Exception as e:
            print(f"Error al obtener el formulario por ID: {e}")
        finally:
            cursor.close()
            conn.close()

    return None


