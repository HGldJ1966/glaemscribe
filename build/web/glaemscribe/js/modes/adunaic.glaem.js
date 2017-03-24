Glaemscribe.resource_manager.raw_modes["adunaic"] = "\\**\n\nGlǽmscribe (also written Glaemscribe) is a software dedicated to\nthe transcription of texts between writing systems, and more \nspecifically dedicated to the transcription of J.R.R. Tolkien\'s \ninvented languages to some of his devised writing systems.\n\nCopyright (C) 2015 Benjamin Babut (Talagan).\n\nThis program is free software: you can redistribute it and/or modify\nit under the terms of the GNU Affero General Public License as published by\nthe Free Software Foundation, either version 3 of the License, or\nany later version.\n\nThis program is distributed in the hope that it will be useful,\nbut WITHOUT ANY WARRANTY; without even the implied warranty of\nMERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\nGNU Affero General Public License for more details.\n\nYou should have received a copy of the GNU Affero General Public License\nalong with this program.  If not, see <http://www.gnu.org/licenses/>.\n\n**\\\n\n\\beg changelog\n \\entry \"0.0.2\" \"Added option for o/u tehtar loop orientation\"\n \\entry \"0.0.3\" \"Normalizing to virtual chars\" \n \\entry \"0.0.4\" \"Added charset support for Annatar\"\n \\entry \"0.0.5\" \"Added support for the FreeMonoTengwar font\"\n \\entry \"0.0.6\" \"Added wave/bar option for consonant modifications sign\"\n \\entry \"0.1.0\" \"Added support for the Tengwar Elfica font\"\n\\end\n\n\\**  Adunaic mode for glaemscribe (MAY BE INCOMPLETE) **\\\n\\language Adûnaic\n\\writing  Tengwar\n\\mode     Glaemscrafu\n\\version  \"0.1.0\"\n\\authors  \"Talagan (Benjamin Babut), based on J.R.R Tolkien\"\n\n\\charset  tengwar_ds_sindarin true\n\\charset  tengwar_ds_parmaite false\n\\charset  tengwar_ds_eldamar  false\n\\charset  tengwar_ds_annatar  false\n\\charset  tengwar_ds_elfica   false\n\\charset  tengwar_freemono    false\n\n\\beg      options\n  \\beg option reverse_o_u_tehtar O_UP_U_DOWN\n    \\value O_UP_U_DOWN 1\n    \\value U_UP_O_DOWN 2\n  \\end\n\n  \\beg option consonant_modification_style CONSONANT_MODIFICATION_STYLE_BAR\n    \\value CONSONANT_MODIFICATION_STYLE_WAVE 0\n    \\value CONSONANT_MODIFICATION_STYLE_BAR 1\n  \\end\n\n  \\option reverse_numbers true\n  \\beg option numbers_base BASE_12\n    \\value    BASE_10 10\n    \\value    BASE_12 12\n  \\end\n\n\\end\n\n\\beg      preprocessor\n  \\** Work exclusively downcase **\\\n  \\downcase\n  \n  \\** Simplify trema vowels **\\\n  \\substitute \"ä\" \"a\"\n  \\substitute \"ë\" \"e\"\n  \\substitute \"ï\" \"i\"\n  \\substitute \"ö\" \"o\"\n  \\substitute \"ü\" \"u\"\n  \\substitute \"ÿ\" \"y\"\n  \n  \\** Dis-ambiguate long vowels **\\\n  \\rxsubstitute \"(ā|â|aa)\" \"á\"\n  \\rxsubstitute \"(ē|ê|ee)\" \"é\"\n  \\rxsubstitute \"(ī|î|ii)\" \"í\"\n  \\rxsubstitute \"(ō|ô|oo)\" \"ó\"\n  \\rxsubstitute \"(ū|û|uu)\" \"ú\"\n  \\rxsubstitute \"(ȳ|ŷ|yy)\" \"ý\"\n  \n  \\** Preprocess numbers **\\\n  \\elvish_numbers \"\\\\eval numbers_base\" \"\\\\eval reverse_numbers\"\n\\end\n\n\\beg      processor\n\n  \\beg    rules litteral  \n  \n    \\if \"consonant_modification_style == CONSONANT_MODIFICATION_STYLE_WAVE\"\n      {GEMINATE} === GEMINATE_SIGN_TILD\n    \\else\n      {GEMINATE} === GEMINATE_SIGN\n    \\endif\n  \n    {A}   === a\n    {AA}  === á\n    {E}   === e\n    {EE}  === é\n    {I}   === i\n    {II}  === í\n    {O}   === o\n    {OO}  === ó\n    {U}   === u\n    {UU}  === ú\n\n    \\** Short diphthongs **\\\n    {AI}  === {A}{I}\n    {AU}  === {A}{U}\n\n    \\** LONG diphthongs **\\      \n    {AAI} === {AA}{I} \\** âi **\\\n    {AAU} === {AA}{U} \\** âu **\\\n    {EEI} === {EE}{I} \\** êi **\\\n    {EEU} === {EE}{U} \\** êu **\\\n    {OOI} === {OO}{I} \\** ôi **\\\n    {OOU} === {OO}{U} \\** ôu **\\\n        \n    \\if \"reverse_o_u_tehtar == U_UP_O_DOWN\"\n      {O_LOOP} === O_TEHTA\n      {U_LOOP} === U_TEHTA\n    \\else\n      {O_LOOP} === U_TEHTA\n      {U_LOOP} === O_TEHTA\n    \\endif\n        \n    {SDIPHTHONGS}  === {AI}           * {AU}\n    {SDIPHTHENGS}  === YANTA A_TEHTA  * URE A_TEHTA \n                   \n    {LDIPHTHONGS}  === {AAI}               * {AAU}              * {EEI}              * {EEU}            * {OOI}               * {OOU}\n    {LDIPHTHENGS}  === ARA A_TEHTA YANTA   * ARA A_TEHTA URE    * ARA E_TEHTA YANTA  * ARA E_TEHTA URE  * ARA {O_LOOP} YANTA  * ARA {O_LOOP} URE\n                                                                                                                 \n    {VOWELS}      === {A}          * {E}          * {I}          * {O}          * {U}    \n    {_TEHTAR_}    === A_TEHTA      * E_TEHTA      *  I_TEHTA     * {O_LOOP}     * {U_LOOP}\n                   \n    {LVOWELS}     === {AA}         * {EE}         * {II}         * {OO}         * {UU}\n    {LVOWTNG}     === ARA A_TEHTA  * ARA E_TEHTA  * ARA I_TEHTA  * ARA {O_LOOP} * ARA {U_LOOP} \n\n    \\** Let\' put all vowels/diphthongs in the same basket **\\\n    {V_D}         === [ {VOWELS}    * {LVOWELS} * {SDIPHTHONGS} * {LDIPHTHONGS} ]        \n    \\** And their images... **\\            \n    {_V_D_}       === [ {_TEHTAR_}  * {LVOWTNG} * {SDIPHTHENGS} * {LDIPHTHENGS} ]\n  \n    [{VOWELS}]       --> TELCO [{_TEHTAR_}]   \\** Replace isolated short vowels **\\\n    [{LVOWELS}]      --> [{LVOWTNG}]    \\** Replace long vowels **\\\n    [{SDIPHTHONGS}]  --> [{SDIPHTHENGS}]  \\** Replace short diphthongs **\\\n    [{LDIPHTHONGS}]  --> [{LDIPHTHENGS}]  \\** Replace long diphthongs **\\\n\n    \\** ================ **\\\n    \\**    CONSONANTS    **\\\n    \\** ================ **\\     \n    {K}   === (c,k)\n    {V}   === (v,w)\n\n    {L1_S}         === {K}     * p     * t     * {K}{K}            * pp                * tt\n    {L1_T}         === QUESSE  * PARMA * TINCO * CALMA {GEMINATE}  * PARMA {GEMINATE}  * TINCO  {GEMINATE}\n    \n    [{L1_S}]       -->  [ {L1_T} ]\n    [{L1_S}]{V_D}  -->  [ {L1_T} ]{_V_D_} \n\n    {L2_S}         === d    * b     * g     * dd              * bb                * gg\n    {L2_T}         === ANDO * UMBAR * UNGWE * ANDO {GEMINATE} * UMBAR {GEMINATE}  * UNGWE {GEMINATE}\n    [{L2_S}]       --> [{L2_T}] \n    [{L2_S}]{V_D}  --> [{L2_T}]{_V_D_} \n\n    \\** Alignment of tehta is not the same in the font **\\\n    \\** So we need to split the third line unfortunately **\\\n    {L3_1_S}          === th    * ph      * (t,th)th          * (p,ph)ph            * (t,th)ph    * (k,kh)ph      * (p,ph)th    * (k,kh)th\n    {L3_1_T}          === SULE  * FORMEN  * SULE {GEMINATE}   * FORMEN {GEMINATE}   * SULE FORMEN * HWESTA FORMEN * FORMEN SULE * HWESTA SULE\n   \n    {L3_2_S}          === sh    * kh      * (k,kh)kh          * (p,ph)kh            * (t,th)kh\n    {L3_2_T}          === AHA   * HWESTA  * HWESTA {GEMINATE} * FORMEN HWESTA       * SULE HWESTA\n   \n    [{L3_1_S}]        --> [{L3_1_T}] \n    [{L3_1_S}]{V_D}   --> [{L3_1_T}]{_V_D_} \n    [{L3_2_S}]        --> [{L3_2_T}] \n    [{L3_2_S}]{V_D}   --> [{L3_2_T}]{_V_D_} \n\n    {L4_S}            === nd    * mb    * ng\n    {L4_T}            === ANTO  * AMPA  * UNQUE\n    [{L4_S}]          --> [{L4_T}] \n    [{L4_S}]{V_D}     --> [{L4_T}]{_V_D_} \n\n    {L5_S}            === n     * m     * nn                 * mm\n    {L5_T}            === NUMEN * MALTA * NUMEN {GEMINATE}   * MALTA {GEMINATE}\n    [{L5_S}]          --> [{L5_T}] \n    [{L5_S}]{V_D}     --> [{L5_T}]{_V_D_} \n\n    {L6_S}            === {V}   * y     * rr                 * {V}{V}             * yy\n    {L6_T}            === VALA  * ANNA  * ROMEN {GEMINATE}   * VALA {GEMINATE}    * ANNA {GEMINATE}\n    [r * {L6_S}]      --> [ ORE   * {L6_T}] \n    [r * {L6_S}]{V_D} --> [ ROMEN * {L6_T}]{_V_D_} \n\n    \\** This one is not useful (redundant with higher) **\\\n    \\** Keep it for clarity of mind **\\\n    r_                --> ORE\n\n    s{V_D}            --> SILME_NUQUERNA {_V_D_}  \\** Before a vowel goes down **\\\n    s                 --> SILME                   \\** Any other pos, up **\\\n    z{V_D}            --> ESSE_NUQUERNA {_V_D_}   \\** Before a vowel goes down **\\\n    z                 --> ESSE                    \\** Any other pos, up **\\\n\n    h{V_D}            --> HYARMEN {_V_D_}\n    h                 --> HYARMEN\n    hh{V_D}           --> HYARMEN {GEMINATE} {_V_D_}\n    hh                --> HYARMEN {GEMINATE}\n                      \n    l{V_D}            --> LAMBE {_V_D_}\n    l                 --> LAMBE\n                      \n    ll{V_D}           --> LAMBE {GEMINATE} {_V_D_}\n    ll                --> LAMBE {GEMINATE}\n  \n  \\end\n  \n  \\beg rules punctutation\n    . --> PUNCT_DDOT\n    .. --> PUNCT_DOT PUNCT_DDOT PUNCT_DOT\n    …  --> PUNCT_TILD\n    ... --> PUNCT_TILD\n    .... --> PUNCT_TILD\n    ..... --> PUNCT_TILD\n    ...... --> PUNCT_TILD\n    ....... --> PUNCT_TILD\n\n    , --> PUNCT_DOT\n    : --> PUNCT_DOT\n    ; --> PUNCT_DOT\n    ! --> PUNCT_EXCLAM\n    ? --> PUNCT_INTERR\n    · --> PUNCT_DOT\n\n    \\** Apostrophe **\\\n\n    \' --> {NULL}\n    ’ --> {NULL}\n\n    \\** Quotes **\\\n\n    “ --> DQUOT_OPEN\n    ” --> DQUOT_CLOSE\n    « --> DQUOT_OPEN \n    » --> DQUOT_CLOSE \n    \n    - --> PUNCT_DOT    \n    – --> PUNCT_TILD  \n    — --> PUNCT_DTILD\n \n    [ --> PUNCT_PAREN_L\n    ] --> PUNCT_PAREN_R\n    ( --> PUNCT_PAREN_L\n    ) --> PUNCT_PAREN_R\n    { --> PUNCT_PAREN_L\n    } --> PUNCT_PAREN_R\n    < --> PUNCT_PAREN_L\n    > --> PUNCT_PAREN_R  \n\n    \\** Not universal between fonts ... **\\\n    $ --> BOOKMARK_SIGN\n    ≤ --> RING_MARK_L \\** Ring inscription left beautiful stuff **\\\n    ≥ --> RING_MARK_R \\** Ring inscription right beautiful stuff **\\\n  \\end\n\n  \\beg rules numbers\n    0 --> NUM_0\n    1 --> NUM_1\n    2 --> NUM_2\n    3 --> NUM_3\n    4 --> NUM_4\n    5 --> NUM_5\n    6 --> NUM_6\n    7 --> NUM_7\n    8 --> NUM_8\n    9 --> NUM_9\n    A --> NUM_10\n    B --> NUM_11   \n  \\end\n  \n\\end\n\n\\beg postprocessor\n  \\resolve_virtuals\n\\end\n"