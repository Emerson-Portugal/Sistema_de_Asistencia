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


def insertar_formulario(dni_usuario, descripcion, fecha_retorno, autorizacion_jefe, cargo_jefe):
    conn = create_connection()
    
    if conn:
        try:
            cursor = conn.cursor()

            # Insertar datos en la tabla formulario
            cursor.execute("""
                INSERT INTO formulario (dni_usuario, descripcion, fecha_retorno, autorizacion_jefe, cargo_jefe)
                VALUES (%s, %s, %s, %s, %s)
            """, (dni_usuario, descripcion, fecha_retorno, autorizacion_jefe, cargo_jefe))

            # Commit para aplicar los cambios en la base de datos
            conn.commit()

            print("Datos del formulario insertados correctamente.")

        except Exception as e:
            print(f"Error al insertar datos en la tabla formulario: {e}")

        finally:
            cursor.close()
            conn.close()



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






def enviar_solicitud_asistencia(dni_usuario, descripcion, fecha_retorno, autorizacion_jefe, cargo_jefe):
    id_solicitud = next(solicitud_counter)
    
    solicitud = {
        "id": id_solicitud,
        "dni_usuario": dni_usuario,
        "descripcion": descripcion,
        "fecha_retorno": fecha_retorno,
        "autorizacion_jefe": autorizacion_jefe,
        "cargo_jefe": cargo_jefe,
        "respuesta_jefe": None  
    }

    solicitudes_pendientes.append(solicitud)
    return id_solicitud


def responder_solicitud_asistencia(id_solicitud, respuesta_jefe):
    # Lógica para que el jefe responda a una solicitud pendiente
    for solicitud in solicitudes_pendientes:
        if solicitud["id"] == id_solicitud:
            solicitud["respuesta_jefe"] = respuesta_jefe
            break



def obtener_solicitud(id_solicitud):
    for solicitud in solicitudes_pendientes:
        if solicitud["id"] == id_solicitud:
            return solicitud
    return None

def obtener_solicitudes_pendientes():
    return solicitudes_pendientes



def obtener_respuesta_del_jefe(id_formulario):
    conn = create_connection()
    
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT respuesta_jefe FROM formularios WHERE id = %s;", (id_formulario,))
            respuesta_jefe = cursor.fetchone()
            return respuesta_jefe[0] if respuesta_jefe else None
        except Exception as e:
            print(f"Error al obtener la respuesta del jefe: {e}")
        finally:
            cursor.close()
            conn.close()



# Esta función podría ser llamada cuando el jefe responde a la solicitud
def actualizar_respuesta_del_jefe(id_formulario, respuesta_jefe):
    conn = create_connection()
    
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute("UPDATE formularios SET respuesta_jefe = %s WHERE id = %s;", (respuesta_jefe, id_formulario))
            conn.commit()
        except Exception as e:
            print(f"Error al actualizar la respuesta del jefe: {e}")
        finally:
            cursor.close()
            conn.close()