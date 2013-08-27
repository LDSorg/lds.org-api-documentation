Unofficial lds.org API Documentation
===

Since there is no official API for LDS.org,
the debugger tools in Chrome are going to have to suffice.

This is just documentation for lds.org as-is.
If you want a library that you could use with
PhantomJS,
CasperJS,
or a [bookmarklet](http://bookmarkleteer.com),
see [ldsorgjs](https://github.com/LDSorg/ldsorgjs).

Feel free to edit anything that's out-of-date,
just be sure to scrub it of any personal information first.

All of the tokens expire within a few minutes and the ids
are useless unless you're logged in and have pemission to that
unit, so those you don't have to worry about scrubbing as much.

Also note that there are likely fields that a
ward, stake, or area clerk,
and bishop, stake president, or area authority
can see that an unprivileged member cannot.

And whatever you're doing - be it an iOS app or web or whatever,
be keenly aware of privacy and legal concerns.

Overview & Playground
===

Go log into [LDS.org/directory](https://www.lds.org/directory)
and then start clicking on these links below to see what the api looks like.

I'd also recommend installing the Chrome Plugin
[JSONView](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc)
for easy formatting of the data.

  * [LDS.org](https://www.lds.org/)
    * Calendar - [lds.org/church-calendar/services/lucrs/](https://www.lds.org/church-calendar/services/lucrs/)
      * [/mem/hasViewedDirectoryWelcomeMsg/](https://www.lds.org/church-calendar/services/lucrs/mem/hasViewedDirectoryWelcomeMsg/)
    * Directory - [lds.org/directory/services/ludrs](https://www.lds.org/directory/services/ludrs/)
      * Version - [/util/ver/](https://www.lds.org/directory/services/ludrs/util/ver/)
      * Locale - [/userLocale/](https://www.lds.org/directory/services/ludrs/page/userLocale/)
      * Page Translation - [/page/str/index](https://www.lds.org/directory/services/ludrs/page/str/index)
      * Ward Metadata - [/unit/current-user-ward-stake/](https://www.lds.org/directory/services/ludrs/unit/current-user-ward-stake/)
      * Stake Metadata - [/unit/current-user-units/](https://www.lds.org/directory/services/ludrs/unit/current-user-units/)
      * User Id - [/mem/current-user-id/](https://www.lds.org/directory/services/ludrs/mem/current-user-id/)
      * Approved Photo - [/mem/currentUserHasApprovedPhoto/](https://www.lds.org/directory/services/ludrs/mem/currentUserHasApprovedPhoto/)
      * Ward Member List - [/mem/member-list/:unit_number](https://www.lds.org/directory/services/ludrs/mem/member-list/:unit_number)
      * Ward Photo List - [/mem/wardDirectory/photos/:unit_number](https://www.lds.org/directory/services/ludrs/mem/wardDirectory/photos/:unit_number)
          * `unit_number` is found in [`/unit/current-user-ward-stake/`](https://www.lds.org/directory/services/ludrs/unit/current-user-ward-stake/) and [`/unit/current-user-units/`](https://www.lds.org/directory/services/ludrs/unit/current-user-units/)
      * Map - [/mem/map/:head_of_house_individual_id](https://www.lds.org/directory/services/ludrs/mem/map/:head_of_house_individual_id)
      * Household - [/mem/householdProfile/:head_of_house_individual_id](https://www.lds.org/directory/services/ludrs/mem/householdProfile/:head_of_house_individual_id)
          * `:head_of_house_individual_id` is found in `/mem/member-list/:ward_unit_no`
      * Individual Photos - [/photo/url/:id_1,:id_2,:id_x/individual](https://www.lds.org/directory/services/ludrs/photo/url/:id_1,:id_2,:id_x/individual)

Note that fields preceded by colons, such as `:unit_number`
require an id that you'd get from another resource.

LDS.org Directory
===

Documentation for the LDS.org Directory based on web debugger inspection.

<https://www.lds.org>

Version
---

    GET /directory/services/ludrs/util/ver/

Current Area, Stake, & Ward MetaData
---

All wards are listed as the stake

    GET /directory/services/ludrs/unit/current-user-ward-stake/

    {
        "areaUnitNo": 777777,
        "branch": false,
        "district": false,
        "mission": false,
        "newPhotoCount": -1,
        "stake": true,
        "stakeName": "Provo Utah YSA 0th Stake",
        "stakeUnitNo": 555555,
        "userHasStakeAdminRights": false,
        "userHasWardAdminRights": false,
        "userHasWardCalling": false,
        "usersHomeWard": true,
        "ward": true,
        "wardName": "Provo YSA 300th Ward",
        "wardUnitNo": 444444
    }

Stakes in Area & Wards in Stake
---

Contains an array of stakes, but lacks the area meta data.

    GET /directory/services/ludrs/unit/current-user-units/

    [
      {
        "district": false,
        "mission": false,
        "stake": true,
        "stakeName": "Provo Utah YSA 0th Stake",
        "stakeUnitNo": 555555,
        "userHasStakeAdminRights": false,
        "wards": [
            {
              "areaUnitNo": 777777,
              "branch": false,
              "district": false,
              "mission": false,
              "newPhotoCount": -1,
              "stake": true,
              "stakeName": "Provo Utah YSA 0th Stake",
              "stakeUnitNo": 555555,
              "userHasStakeAdminRights": false,
              "userHasWardAdminRights": false,
              "userHasWardCalling": false,
              "usersHomeWard": true,
              "ward": true,
              "wardName": "Provo YSA 300th Ward",
              "wardUnitNo": 444444
            }
        ]
      }
    ]

The `current-user-units` will be a collection of wards and / or branches of the currently logged-in user.

Households in Ward
---

Individual wards contain the list of members

    GET /directory/services/ludrs/mem/member-list/:ward_unit_no

    [
        {
          "children": [],
          "coupleName": "Doe, John",
          "headOfHouse": {
            "directoryName": "Doe, John",
            "gender": "MALE",
            "individualId": 3333333333,
            "latinName": "Doe",
            "latinNameDifferent": false,
            "preferredName": "Doe, John",
            "surname": "Doe"
          },
          "headOfHouseIndividualId": 3333333333,
          "householdName": "Doe",
          "isProfilePrivate": false,
          "spouse": {
            "directoryName": "",
            "gender": "",
            "individualId": -1,
            "latinName": "",
            "latinNameDifferent": true,
            "preferredName": "",
            "surname": ""
          }
        }
    ]

Family Photos in Ward
---

The photos and phone numbers are already available in the household resource.

I'm not sure if any of the phone number, photo, or household name are actually different,
so this resource may be entirely unnecessary.

  * headOfHousehold.photoUrl (individual photo)
  * householdInfo.photoUrl (entire family photo)

The family phone number and family photo can be accessed like so

    GET /directory/services/ludrs/mem/wardDirectory/photos/:ward_unit_no

    [
        {
          "householdId": 3333333333,
          "householdName": "Doe, John",
          "phoneNumber": "555-726-3117",
          "photoUrl": "/bcs/content?token=6zr5CJL5hQ7QdxHZZp8LG_aKQWafJ8x0V8gyTExIvoEZcCmlBICSabVO7rF7JIOR6y94HWsYKNCtilHK6fJTfwTT-mR0SV8_jKm7lRcobsfgpDnVHl3_EV1z3Ysnj30EZIHQ7EbIxXE6zzY-d_9x5W43mrnJJI-N%3dt_U1ZvJ4jZiRhx7S8KlE%3dXWMv0Vbv6i1ySrWhMTlqK6EQbhhqG0MsWNUtM4PsG%3d%3dvIlgKoLQFWgCHX5A9k_nix9iPPZezcE8BoobjcsJ2WTXlKF7WnC7hsu"
        }
    ]
    
Note that in YSA wards the family phone number and family photo are often the individuals photo,
but since there's de facto convention and either could be out of sync, try both.

Household & Members / Individuals in Household
---

The **individual photo** is `headOfHousehold.photoUrl`.

The **family photo** is `householdInfo.photoUrl` (and I can confirm it's different from the above).

The **individual phone number** is `headOfHousehold.phone`.

The **family phone number** is `householdInfo.phone` (but I'm not sure if it's different).

    GET /directory/services/ludrs/mem/householdProfile/:head_of_house_individual_id

    {
      "canViewMapLink": true,
      "hasEditRights": true,
      "headOfHousehold": {
        "address": null,
        "addressLevel": null,
        "birthDateLevel": "WARD",
        "email": "john.doe@gmail.com",
        "emailLevel": "STAKE",
        "imageId": "51963879243749023320-eng",
        "imageLevel": "STAKE",
        "individualId": 3333333333,
        "isAllPrivate": false,
        "mapLevel": null,
        "masterLevel": null,
        "name": "Doe, John",
        "phone": "555-726-3117",
        "phoneLevel": "STAKE",
        "photoUrl": "/bcs/content?token=uDglPJ4yUAOSRRcKZLwOSfCRPTmeIooHisTFIVpJj4YZcCmlBICSabVO7rF7JIOR6y94HWwYKNCti1HK6g7oigXS-np0SV8_jKm7lRcobsfgpDnVHl3_EV1z3Ysnj30EZIHQ7EbIxXE6zzY-d_9x5W43mrnJJI-N%3dt_U1ZvJ4jZiRhx7S8KlE%3dTYMwkVbf5n2SSrpfwUqJK6EQbhhqG0MsWNUtM4PsG%3d%3dvILfM9LClvgCHXOBdh6zRx2cyHZek1R7io4bjcsJ2WTXlKF7WnC7hsu"
      },
      "householdInfo": {
        "address": {
          "addr1": "750 W 1700 N Apt 1",
          "addr2": "Provo, Utah 84604",
          "addr3": "",
          "addr4": "",
          "addr5": "",
          "city": "Provo",
          "countryCode": 251,
          "countryIsoAlphaCode": "USA",
          "district": "",
          "groupId": 1670219,
          "latitude": 40.2599249,
          "locallyVerifiedCode": "",
          "longitude": -111.6556598,
          "postal": "84604",
          "state": "Utah",
          "stateCode": 44,
          "streetAddr1": "750 W 1700 N Apt 1",
          "streetAddr2": ""
        },
        "addressLevel": "STAKE",
        "birthDateLevel": null,
        "email": "john.doe@gmail.com",
        "emailLevel": "STAKE",
        "imageId": "72558875098790051910-eng",
        "imageLevel": "STAKE",
        "individualId": 3333333333,
        "isAllPrivate": false,
        "mapLevel": "STAKE",
        "masterLevel": "STAKE",
        "name": "Doe",
        "phone": "555-726-3117",
        "phoneLevel": "STAKE",
        "photoUrl": "/bcs/content?token=vTklO9Elgg2mSRgKPcAAHy%3dAR0dyIr0GVvkuT1S4jo5ZcCmlBICSabVO7rF7JIOR6y94HWwYKNCti1HK5BSohf_SCmh0SV8_jKm7lRcobsfgpDnVHl3_EV1z3Ysnj30EZIHQ7EbIxXE6zzY-d_9x5W43mrnJJI-N%3dt_U1ZvJ4jZiRhx7S8KlE%3dXWMv0Vbv6i1ySrWhMTlqK6EQbhhqG0MsWNUtM4PsG%3d%3dvIlgKoLQFWgCHX5A9k_nix9iPPZezcE8BoobjcsJ2WTXlKF7WnC7hsu"
      },
      "id": 0,
      "inWard": true,
      "isEuMember": false,
      "otherHouseholdMembers": [],
      "spouse": null,
      "ward": {
        "areaUnitNo": 777777,
        "branch": false,
        "district": false,
        "mission": false,
        "stake": true,
        "stakeName": "Provo Utah YSA 0th Stake",
        "stakeUnitNo": 555555,
        "ward": true,
        "wardName": "Provo YSA 300th Ward",
        "wardUnitNo": 444444
      }
    }

Map of Household
---

You can build the urlLink yourself,
so this resource may be entirely unnecessary.

    GET /directory/services/ludrs/mem/map/:head_of_house_individual_id

    {
      "urlLink": "https://lds.org/rcmaps/#x=ward&ward=12345&id=household:1234567890"
    }

Member
---

There are no individual records accessible via the Directory. Only household and head of household.

Phone Numbers are only visible via the photos resource.

The only individual data is about the current user.

    GET /directory/services/ludrs/mem/current-user-id/

    GET /directory/services/ludrs/page/userLocale/

### Photo Upload

The flash uploader tool does some image manipulation on the file you upload
and actually produces 3 separate files which are uploaded to the server.

Despite the name, the *original* version is **not** the true original.
Although I was able to capture a HAR file of the upload,
the jpeg binary got messed up in the utf-8 conversion
and I wasn't able to decode it.

What I do know however is that when you upload the recommended 500x375 image (4:3),
it is downsized to 200x150 (4:3) for family photos and perhaps 100x? for individual photos.
I also know that lds.org uses a 40x40 thumbnail.

My *guess* is that compression is increased on the original size image,
the image is scaled to whatever fits best in the bounds of 200x150
and then (intelligently?) cropped to 40x40
(or at least it seems to do a good job of getting the face).

    POST /directory/services/ludrs/photo/upload/:individual_id/household/:ward_unit_no}/:stake_unit_no/:area_unit_no

    name="file0"; filename="original_:picname.jpg"
    name="file1"; filename="medium_:picname.jpg" 200x150 (height is exactly 150, width may be up to 150 or 200)
    name="file2"; filename="thumbnail_:picname.jpg" 40x40 ()

    {"good":true,"message":""}

Approved Photo
---

Let's you know whether or not the ward clerk has approved a photo uploaded by you (the logged in individual).

    GET /mem/currentUserHasApprovedPhoto/
    
    { "good": true
    , "message": "true"
    }
