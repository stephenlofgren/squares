"""define the game model for the project"""
from django.db import models
from game_status import GameStatus

class GamePiece(models.Model):
    """defines a device"""
    game_id = models.ForeignKey(Game)
    bottom = models.IntegerField()
    color = models.CharField(max_level=50)
    has_changed = models.BooleanField()
    height = models.IntegerField()
    owner = models.ForeignKey(Player)
    right = models.IntegerField()
    width = models.IntegerField()
    x = models.IntegerField()
    y = models.IntegerField()

    def __str__(self):
        return self.pk

    def jsonToClass(self, aux):
        self.game_id = aux["game_id"]
        self.bottom = aux["bottom"]
        self.color = aux["color"]
        self.has_changed = aux["has_changed"]
        self.height = aux["height"]
        self.owner = aux["owner"]
        self.right = aux["right"]
        self.width = aux["width"]
        self.x = aux["x"]
        self.y = aux["y"]
