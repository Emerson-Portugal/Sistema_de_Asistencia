# queries_pre_approval.py
from app.db.connection import create_connection

class SolicitudAsistencia:
    def __init__(self, dni_usuario, descripcion, fecha_retorno, autorizacion_jefe):
        self.dni_usuario = dni_usuario
        self.descripcion = descripcion
        self.fecha_retorno = fecha_retorno
        self.autorizacion_jefe = autorizacion_jefe


def guardar_pre_aprobacion(solicitud):
    conn = create_connection()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO formulario_temporal
                (dni_usuario, descripcion, fecha_retorno, autorizacion_jefe)
                VALUES (%s, %s, %s, %s)
            """, (solicitud.dni_usuario, solicitud.descripcion, solicitud.fecha_retorno, solicitud.autorizacion_jefe))
            conn.commit()
        except Exception as e:
            print(f"Error al guardar el formulario temporal: {e}")
        finally:
            cursor.close()
            conn.close()
