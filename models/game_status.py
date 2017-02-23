"""define the game model for the project"""
from django.db import models


class GameStatus(models.Model):
    """defines a device"""
    status_name = models.CharField(max_length=50)

    def __str__(self):
        return self.pk

    @classmethod
    def create(cls, new_status_name):
        """used to instantiate a new D1Mini, not sure we need this but
           some website suggested it would solve a problem.
           need fo find usages"""
        game_status = cls(
            status_name=new_status_name,
        )
        return game_status
