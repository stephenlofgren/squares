"""define the game model for the project"""
from django.db import models
from game_status import GameStatus

class Game(models.Model):
    """defines a device"""
    game_status_id = models.ForeignKey(GameStatus)
    start_date = models.DateTimeField()

    def __str__(self):
        return self.pk

    @classmethod
    def create(cls, new_game_status_id, new_start_date):
        """used to instantiate a new D1Mini, not sure we need this but
           some website suggested it would solve a problem.
           need fo find usages"""
        game = cls(
            game_status_id=new_game_status_id,
            start_date=new_start_date
        )
        return game
