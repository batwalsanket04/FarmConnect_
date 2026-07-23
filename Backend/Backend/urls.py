from django.contrib import admin
from django.http import HttpResponse
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


def root(request):
    return HttpResponse("FarmConnect Backend Running")


urlpatterns = [
    path("", root),
    path("admin/", admin.site.urls),
    path("api/", include("farmconnect.urls")),
]

urlpatterns += static(
    settings.MEDIA_URL,
    document_root=settings.MEDIA_ROOT,
)