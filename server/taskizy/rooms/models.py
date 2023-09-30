from django.db import models
from users.models import User
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _


class Room(models.Model):
    room_id = models.BigAutoField(
        _("room_ID"),
        primary_key=True,
        auto_created=True,
        serialize=False,
    )

    room_name = models.CharField(_("room_name"), max_length=25, null=False, blank=False)

    room_created_on = models.DateTimeField(_("room_created_on"), auto_now_add=True)

    room_admin = models.ForeignKey(
        User, verbose_name=_("room_admin"), on_delete=models.RESTRICT
    )

    room_slug = models.SlugField(_("room_slug"))

    def save(self, *args, **kwargs):
        self.room_slug = slugify(self.room_name)
        super(Room, self).save(*args, **kwargs)

    def __str__(self):
        return self.room_name
