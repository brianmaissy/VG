from rest_framework import generics
from django.contrib.auth.models import User
from django.contrib.auth import logout

from webapp.permission import SynagoguePermission
from webapp.models import Synagogue
from webapp.serializers import UserSerializer, SynagogueSerializer
from webapp.forms import LoginForm
from django.http import Http404, HttpResponse
from django.views import View
from django.db import transaction


class UserCreateAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class SynagogueListCreateView(generics.ListCreateAPIView):
    queryset = Synagogue.objects.all()
    serializer_class = SynagogueSerializer

    # this post does a lot in different tables (user, group, synagogue), so let's make it atomic
    @transaction.atomic
    def post(self, request, *args, **kwargs):
        return super(SynagogueListCreateView, self).post(request, *args, **kwargs)


class SynagogueDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Synagogue.objects.all()
    serializer_class = SynagogueSerializer
    permission_classes = (SynagoguePermission,)


class LoginView(View):
    def post(self, request):
        form = LoginForm(self.request.POST)
        if not form.is_valid():
            raise Http404()
        form.save(request)
        return HttpResponse()


class LogoutView(View):
    def post(self, request):
        logout(request)
        return HttpResponse()
