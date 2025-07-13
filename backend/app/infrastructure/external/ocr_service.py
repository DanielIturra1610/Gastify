import re
from typing import Dict, Any, Optional
from datetime import datetime

class OCRService:
    """Servicio para reconocimiento óptico de caracteres (OCR) de boletas y facturas chilenas.
    
    Nota: Para el MVP, esta es una implementación simulada. En producción,
    se implementaría integración con servicios como Google Vision API o Tesseract.
    """
    
    async def extract_text_from_image(self, image_bytes: bytes) -> str:
        """Extrae texto de una imagen (simulado para MVP)."""
        # En una implementación real, aquí se utilizaría un servicio de OCR
        # Para el MVP, devolvemos un texto simulado
        return """
        BOLETA ELECTRONICA
        RUT: 76.123.456-7
        RESTAURANT EL CHILENO
        FECHA: 10-07-2025
        HORA: 14:30
        
        DETALLE:
        1 x ALMUERZO EJECUTIVO  $8.500
        1 x BEBIDA              $1.500
        
        SUBTOTAL:              $10.000
        IVA 19%:               $1.900
        TOTAL:                 $11.900
        
        GRACIAS POR SU COMPRA
        """
    
    async def process_receipt(self, image_bytes: bytes) -> Dict[str, Any]:
        """Procesa una imagen de boleta/factura y extrae información relevante."""
        # Obtener el texto mediante OCR
        text = await self.extract_text_from_image(image_bytes)
        
        # Extraer información relevante
        result = {
            "success": True,
            "raw_text": text,
            "data": {
                "rut": self._extract_rut(text),
                "vendor": self._extract_vendor(text),
                "date": self._extract_date(text),
                "amount": self._extract_amount(text),
                "documentType": self._detect_document_type(text),
                "documentNumber": self._extract_document_number(text),
                "items": self._extract_items(text)
            }
        }
        
        return result
    
    def _extract_rut(self, text: str) -> Optional[str]:
        """Extrae el RUT del texto."""
        # Buscar patrón de RUT chileno: XX.XXX.XXX-X o sin puntos
        rut_patterns = [
            r'\d{1,2}\.\d{3}\.\d{3}-[\dkK]',  # Con puntos: 76.123.456-7
            r'\d{7,8}-[\dkK]'                 # Sin puntos: 76123456-7
        ]
        
        for pattern in rut_patterns:
            match = re.search(pattern, text)
            if match:
                return match.group(0)
                
        return None
    
    def _extract_vendor(self, text: str) -> Optional[str]:
        """Extrae el nombre del vendedor/empresa del texto."""
        # Para el MVP, simulamos la extracción basada en el texto de ejemplo
        if "RESTAURANT EL CHILENO" in text:
            return "RESTAURANT EL CHILENO"
        
        # En una implementación real, se utilizarían técnicas más sofisticadas
        # como buscar después de "RAZÓN SOCIAL:" o antes de "RUT:"
        return None
    
    def _extract_date(self, text: str) -> Optional[datetime]:
        """Extrae la fecha del texto."""
        # Buscar patrones de fecha comunes en Chile: DD-MM-YYYY o DD/MM/YYYY
        date_patterns = [
            r'(\d{1,2})[-/](\d{1,2})[-/](20\d{2})',  # DD-MM-YYYY o DD/MM/YYYY
            r'FECHA:?\s*(\d{1,2})[-/](\d{1,2})[-/](20\d{2})'  # FECHA: DD-MM-YYYY
        ]
        
        for pattern in date_patterns:
            match = re.search(pattern, text)
            if match:
                day, month, year = map(int, match.groups())
                try:
                    return datetime(year, month, day)
                except ValueError:
                    pass
                
        return None
    
    def _extract_amount(self, text: str) -> Optional[float]:
        """Extrae el monto total del texto."""
        # Buscar patrones de monto total en pesos chilenos
        amount_patterns = [
            r'TOTAL:?\s*\$\s*([\d\.]+)',  # TOTAL: $ XX.XXX
            r'TOTAL:?\s*([\d\.]+)',        # TOTAL: XX.XXX
            r'MONTO TOTAL:?\s*\$\s*([\d\.]+)'  # MONTO TOTAL: $ XX.XXX
        ]
        
        for pattern in amount_patterns:
            match = re.search(pattern, text)
            if match:
                # Eliminar puntos que en Chile se usan como separador de miles
                amount_str = match.group(1).replace(".", "")
                try:
                    return float(amount_str)
                except ValueError:
                    pass
                
        return None
    
    def _detect_document_type(self, text: str) -> str:
        """Detecta el tipo de documento (Boleta o Factura)."""
        text_lower = text.lower()
        if "boleta" in text_lower and "electronica" in text_lower:
            return "Boleta Electrónica"
        elif "boleta" in text_lower:
            return "Boleta"
        elif "factura" in text_lower and "electronica" in text_lower:
            return "Factura Electrónica"
        elif "factura" in text_lower:
            return "Factura"
        else:
            return "Otro"
    
    def _extract_document_number(self, text: str) -> Optional[str]:
        """Extrae el número de documento."""
        # Buscar patrones como "BOLETA N° 12345" o "FACTURA #12345"
        num_patterns = [
            r'(?:BOLETA|FACTURA)(?:\sELECTRONICA)?(?:\s+N[°º]|\s+#|\s+NUMERO)?\s*(\d+)',
            r'N[°º]?\s*:?\s*(\d+)',
        ]
        
        for pattern in num_patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                return match.group(1)
                
        return None
    
    def _extract_items(self, text: str) -> list:
        """Extrae los ítems o productos de la boleta/factura."""
        # Para el MVP, retornamos ítems simulados basados en el texto de ejemplo
        items = []
        
        if "ALMUERZO EJECUTIVO" in text:
            items.append({
                "description": "ALMUERZO EJECUTIVO",
                "quantity": 1,
                "price": 8500
            })
        
        if "BEBIDA" in text:
            items.append({
                "description": "BEBIDA",
                "quantity": 1,
                "price": 1500
            })
        
        # En una implementación real, se analizaría el texto entre "DETALLE:" y "SUBTOTAL:"
        # buscando patrones de cantidad x descripción $ precio
        
        return items