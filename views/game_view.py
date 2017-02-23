"""defines X10View"""
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import api_view, renderer_classes, permission_classes
from rest_framework import permissions
from django.template.loader import get_template
from django.template import RequestContext, Template
from django.shortcuts import render

import json
from django.core.serializers.json import DjangoJSONEncoder

# ViewS ets define the view behavior.
class GameView(APIView):
    """defines views for each of the http verbs"""

    @api_view(['GET'])
    @permission_classes((permissions.AllowAny,))
    def Show(request, pk=None):
        """returns the status"""
        context_dict = {'id': 1, 'player_count': 3}
        return render(request, 'squares/game.html', context_dict)

    @api_view(['GET'])
    @permission_classes((permissions.AllowAny,))
    def start_game(request, pk=None):
        """returns the status"""
        return Response("")

    @api_view(["Post"])
    @permission_classes((permissions.AllowAny,))
    def post_move(request, pk=None):
        data = request.data
        return Response("")

