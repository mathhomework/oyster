from django.contrib import admin
from main_app.models import *

# Register your models here.

admin.site.register(Author)
admin.site.register(Review)
admin.site.register(Subject)

admin.site.register(SubjectVote)
admin.site.register(ReviewVote)

