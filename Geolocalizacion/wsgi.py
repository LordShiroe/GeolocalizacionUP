"""
WSGI config for Geolocalizacion project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.10/howto/deployment/wsgi/
"""

import os
import sys

sys.path.append('C:\Users\CarlosArturo\Bitnami Django Stack projects\Geolocalizacion')
os.environ.setdefault("PYTHON_EGG_CACHE", "C:\Users\CarlosArturo\Bitnami Django Stack projects\Geolocalizacion\egg_cache")

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Geolocalizacion.settings")

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
