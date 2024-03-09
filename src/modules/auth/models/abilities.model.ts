export interface AbilityObj {
    label: string;
    code: Ability;
}

export interface AbilityGroup {
    label: string;
    abilities: AbilityObj[];
}


export type Ability =
    // For global
    "EditGlobal" |
    // For Regions
    'ReadRegions' |
    'EditRegions' |
    'DeleteRegions' |

    // For sites
    'ReadSites' |
    'EditSites' |
    'DeleteSites' |

    // For Floors
    'ReadFloors' |
    'EditFloors' |
    'DeleteFloors' |

    // For Offices
    'ReadOffices' |
    'EditOffices' |
    'DeleteOffices' |

    // For Groups
    'ReadGroups' |
    'EditGroups' |
    'DeleteGroups' |

    // For Business Units
    'ReadBusinessUnits' |
    'EditBusinessUnits' |
    'DeleteBusinessUnits' |

    // For Categories
    'ReadCategories' |
    'EditCategories' |
    'DeleteCategories' |

    // For suppliers
    'ReadSuppliers' |
    'EditSuppliers' |
    'DeleteSuppliers' |

    // For assets
    'ReadAssets' |
    'EditAssets' |
    'DeleteAssets' |

    // For Accounts
    'ReadAccounts' |
    'EditAccounts' |
    'DeleteAccounts' |

    // For Inventories Programs
    'ReadInventoriesPrograms' |
    'EditInventoriesPrograms' |
    'DeleteInventoriesPrograms' |

    // For Assets Movements
    'ReadAssetsMovements' |
    'EditAssetsMovements' |
    'DeleteAssetsMovements' |

    // For Exercices
    'ReadExercices' |
    'EditExercices' |
    'DeleteExercices'


export const abilitiesGroups: AbilityGroup[] = [
    {
        label: "Informations de l'entrepri",
        abilities: [
            {
                code: "EditGlobal",
                label: "Editer les informations de l'entreprise"
            }
        ]
    },
    {
        label: "Gestion des regions",
        abilities: [
            {
                label: "Lister les regions",
                code: "ReadRegions"
            },
            {
                label: "Enregistrer et Modifier les regions",
                code: "EditRegions"
            },
            {
                label: "Supprimer les regions",
                code: "DeleteRegions"
            }
        ]
    },
    {
        label: "Gestion des sites",
        abilities: [
            {
                label: "Lister les sites",
                code: "ReadSites"
            },
            {
                label: "Enregistrer et Modifier les sites",
                code: "EditSites"
            },
            {
                label: "Supprimer les sites",
                code: "DeleteSites"
            }
        ]
    },
    {
        label: "Gestion des étages",
        abilities: [
            {
                label: "Lister les étages",
                code: "ReadFloors"
            },
            {
                label: "Enregistrer et Modifier les étages",
                code: "EditFloors"
            },
            {
                label: "Supprimer les étages",
                code: "DeleteFloors"
            }
        ]
    },
    {
        label: "Gestion des bureaux",
        abilities: [
            {
                label: "Lister les bureaux",
                code: "ReadOffices"
            },
            {
                label: "Enregistrer et Modifier les bureaux",
                code: "EditOffices"
            },
            {
                label: "Supprimer les bureaux",
                code: "DeleteOffices"
            }
        ]
    },
    {
        label: "Gestion des groupes",
        abilities: [
            {
                label: "Lister les groupes",
                code: "ReadGroups"
            },
            {
                label: "Enregistrer et Modifier les groupes",
                code: "EditGroups"
            },
            {
                label: "Supprimer les groupes",
                code: "DeleteGroups"
            }
        ]
    },
    {
        label: "Gestion des B.U",
        abilities: [
            {
                label: "Lister les B.U",
                code: "ReadBusinessUnits"
            },
            {
                label: "Enregistrer et Modifier les B.U",
                code: "EditBusinessUnits"
            },
            {
                label: "Supprimer les B.U",
                code: "DeleteBusinessUnits"
            }
        ]
    },
    {
        label: "Gestion des catégories",
        abilities: [
            {
                label: "Lister les catégories",
                code: "ReadCategories"
            },
            {
                label: "Enregistrer et Modifier les catégories",
                code: "EditCategories"
            },
            {
                label: "Supprimer les catégories",
                code: "DeleteCategories"
            }
        ]
    },
    {
        label: "Gestion des fournisseurs",
        abilities: [
            {
                label: "Lister les fournisseurs",
                code: "ReadSuppliers"
            },
            {
                label: "Enregistrer et Modifier les fournisseurs",
                code: "EditSuppliers"
            },
            {
                label: "Supprimer les fournisseurs",
                code: "DeleteSuppliers"
            }
        ]
    },
    {
        label: "Gestion des immobilisations",
        abilities: [
            {
                label: "Lister les immobilisations",
                code: "ReadAssets"
            },
            {
                label: "Enregistrer et Modifier les immobilisations",
                code: "EditAssets"
            },
            {
                label: "Supprimer les immobilisations",
                code: "DeleteAssets"
            }
        ]
    },
    {
        label: "Gestion des comptes",
        abilities: [
            {
                label: "Lister les comptes",
                code: "ReadAccounts"
            },
            {
                label: "Enregistrer et Modifier les comptes",
                code: "EditAccounts"
            },
            {
                label: "Supprimer les comptes",
                code: "DeleteAccounts"
            }
        ]
    },
    {
        label: "Gestion des programmes d'inventaires",
        abilities: [
            {
                label: "Lister les programmes d'inventaires",
                code: "ReadInventoriesPrograms"
            },
            {
                label: "Enregistrer et Modifier les programmes d'inventaires",
                code: "EditInventoriesPrograms"
            },
            {
                label: "Supprimer les programmes d'inventaires",
                code: "DeleteInventoriesPrograms"
            }
        ]
    },
    {
        label: "Gestion des mouvements d'immobilisations",
        abilities: [
            {
                label: "Lister les mouvements d'immobilisations",
                code: "ReadAssetsMovements"
            },
            {
                label: "Enregistrer et Modifier les mouvements d'immobilisations",
                code: "EditAssetsMovements"
            },
            {
                label: "Supprimer les mouvements d'immobilisations",
                code: "DeleteAssetsMovements"
            }
        ]
    },
    {
        label: "Gestion des exercices",
        abilities: [
            {
                label: "Enregistrer et Modifier les exercices",
                code: "EditExercices"
            },
            {
                label: "Supprimer les exercices",
                code: "DeleteExercices"
            }
        ]
    }
]



export const allAbilities = extractAbilityCodes(abilitiesGroups);



function extractAbilityCodes(abilitiesGroups: AbilityGroup[]): Ability[] {
    const codes: Ability[] = [];

    for (const group of abilitiesGroups) {
        for (const ability of group.abilities) {
            codes.push(ability.code);
        }
    }

    return codes;
}



