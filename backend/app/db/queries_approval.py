# queries_approval.py
from app.db.connection import create_connection

class SolicitudAsistencia:
    def __init__(self,id ,dni_usuario, descripcion, fecha_retorno, autorizacion_jefe, estado):
        self.id = id
        self.dni_usuario = dni_usuario
        self.descripcion = descripcion
        self.fecha_retorno = fecha_retorno
        self.autorizacion_jefe = autorizacion_jefe
        self.estado = estado

def listado_pre_aprobacion():
    try:
        conn = create_connection()
        if conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT * FROM formulario_temporal")
                lista = [{"id": row[0], "dni_usuario": row[1], "descripcion": row[2], "fecha_creada": row[3], "fecha_retorno": row[4], "autorizacion_jefe": row[5], "estado": row[6]} for row in cursor.fetchall()]
            return lista
    except Exception as e:
        print(f"Error al obtener el listado de pre-aprobación: {e}")
    finally:
        conn.close()



def actualizar_aprobacion(solicitud):
    try:
        conn = create_connection()
        if conn:
            with conn.cursor() as cursor:
                cursor.execute("""
                    UPDATE formulario_temporal
                    SET estado = %s
                    WHERE formulario_temporal = %s AND dni_usuario = %s
                """, (solicitud.estado, solicitud.id, solicitud.dni_usuario))
                conn.commit()
    except Exception as e:
        print(f"Error al actualizar el formulario temporal: {e}")
    finally:
        conn.close()
