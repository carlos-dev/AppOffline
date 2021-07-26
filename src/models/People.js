import { Model } from "@nozbe/watermelondb";
import { field, date } from "@nozbe/watermelondb/decorators";

export default class People extends Model {
  static table = "people";

  @field("name_title") nameTitle;
  @field("name_first") nameFirst;
  @field("name_last") nameLast;
  @field("gender") gender;
  @field("picture_thumbnail") pictureThumbnail;
  @field("picture_large") pictureLarge;
  @field("email") email;
  @field("location_city") locationCity;
  @field("location_state") locationState;
  @field("location_country") locationCountry;
  @field("phone") phone;
  @field("cell") cell;

  @date("release_date_at") releaseDateAt;
}