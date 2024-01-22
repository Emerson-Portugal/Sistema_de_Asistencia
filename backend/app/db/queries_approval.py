# queries_approval.py
from app.db.connection import create_connection

class SolicitudAsistencia:
    def __init__(self, dni_usuario, descripcion, fecha_retorno, autorizacion_jefe, estado):
        self.dni_usuario = dni_usuario
        self.descripcion = descripcion
        self.fecha_retorno = fecha_retorno
        self.autorizacion_jefe = autorizacion_jefe
        self.estado = estado



def listado_pre_aprobacion():
    conn = create_connection()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT *  FROM formulario_temporal")
            lista = [{"dni_usuario": row[1], "descripcion": row[2], "fecha_creada": row[3], "fecha_retorno": row[4], "autorizacion_jefe": row[5], "estado": row[6]} for row in cursor.fetchall()]
            conn.commit()
        except Exception as e:
            print(f"Error al guardar el formulario temporal: {e}")
        finally:
            cursor.close()
            conn.close()

    return lista



def actualizar_aprobacion(solicitud):
    conn = create_connection()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO formulario
                (dni_usuario, descripcion, fecha_retorno, autorizacion_jefe, estado)
                VALUES (%s, %s, %s, , %s, %s)
            """, (solicitud.dni_usuario, solicitud.descripcion, solicitud.fecha_retorno, solicitud.autorizacion_jefe, solicitud.estado))
            conn.commit()
        except Exception as e:
            print(f"Error al guardar el formulario temporal: {e}")
        finally:
            cursor.close()
            conn.close()
