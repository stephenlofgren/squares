from views.game_view import GameView
from django.conf.urls import url, include


class site():
    @property
    def urls(self):
        return self.get_urls(), 'views', self.name

    def __init__(self, name='views'):
        self.name = name
        
    def get_urls():
        urlpatterns = [
            url(r'^game/$', GameView.Show),
            url(r'^game/([0-9]{1,3})/post_move$', GameView.post_move),
        ]
        return urlpatterns
