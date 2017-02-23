"""define the game model for the project"""
from django.db import models
from game_status import GameStatus

PLAYER_COLORS = (
    (0, 'blue'),
    (1, 'red'),
    (2, 'yellow'),
    (3, 'green'),
    (4, 'orange')
)


class Player(models.Model):
    """defines a player"""
    game_id = models.ForeignKey(Game)
    name = models.CharField(max_length=50)
    color = models.CharField(max_length=50 choices=PLAYER_COLORS)

    def __str__(self):
        return self.pk

    @classmethod
    def create(cls, new_game_id, new_name, new_color):
        """used to instantiate a new instance"""
        player = cls(
            game_id=new_game_id,
            name=new_name,
            color=new_color
        )
        return player
