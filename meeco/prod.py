from .dev import *
import dj_database_url

DEBUG = True

ALLOWED_HOST = ["meecomeetings.herokuapp.com"]

TEMPLATE_DEBUG = False

SECRET_KEY = '8do2di#ye=7nzljl^j4vq_%&+p06r$9d-#q(9q+^9!grgfrvz@'

DATABASES['default'] = dj_database_url.config()